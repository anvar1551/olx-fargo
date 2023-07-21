import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const people = [
  { id: 1, name: "Отправитель" },
  { id: 2, name: "Получатель" },
];

export default function PaymentOption(props) {
  const { handleChange, inputName, currentStep, value } = props;
  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleSelect = (person) => {
    setSelected(person);
    const { name } = person;
    handleChange({ target: { name: inputName, value: name } });
  };

  useEffect(() => {
    setSelected(value[inputName] ? { name: value[inputName] } : people[0]);
  }, [value[inputName]]);

  return (
    <div className="block mt-2">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <label
            htmlFor="points"
            className="block text-sm pl-3 pb-1 font-medium leading-6 text-gray-900"
          >
            Плательщик
          </label>
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="points w-full border-none focus:outline-none  py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 "
              displayValue={(person) => person.name}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Выберите плательщика"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex focus:outline-none items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? " bg-red-500 text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                    onClick={() => handleSelect(person)}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
