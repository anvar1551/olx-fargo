import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const people = [
  { id: 0, name: "" },
  { id: 1, name: "Ташкент, Сергелийский район" },
  { id: 2, name: "Ташкент, Яккасарайский район" },
  { id: 3, name: "Ташкент, Учтепинский район" },
  { id: 4, name: "Ташкент, Зангиатинский район, Бек Барака" },
  { id: 5, name: "Ташкент, Мирзо Улугбекский район" },
  { id: 6, name: "Чирчик, Город Чирчик" },
  { id: 7, name: "Ангрен, Город Ангрен" },
  { id: 8, name: "Гулистан, Город Гулистан" },
  { id: 11, name: "Джизак, Город Джизак" },
  { id: 12, name: "Самарканд, Город Самарканд" },
  { id: 13, name: "Фергана, Город Фергана" },
  { id: 14, name: "Бешарык, Город Бешарык" },
  { id: 15, name: "Коканд, Город Коканд" },
  { id: 16, name: "Коканд (Янги базар), Город Коканд" },
  { id: 17, name: "Наманган, Город Наманган" },
  { id: 18, name: "Касансай, Город Касансай" },
  { id: 19, name: "Мингбулак, Мингбулакский район" },
  { id: 20, name: "Андижан, Город Андижан" },
  { id: 21, name: "Карши, Город Карши" },
  { id: 22, name: "Шахрисабз, Шахрисабзский район" },
  { id: 23, name: "Термез, Город Термез" },
  { id: 24, name: "Бухара, Город Бухара" },
  { id: 25, name: "Гиждуван, Гиждуванский район" },
  { id: 26, name: "Навои, Город Навои" },
  { id: 27, name: "Зарафшан, Город Зарафшан" },
  { id: 28, name: "Ургенч, Город Ургенч" },
  { id: 29, name: "Нукус, Город Нукус" },
];

export default function Example(props) {
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
            Пункты выдачи
          </label>
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="points w-full border-none focus:outline-none  py-2 pl-3 pr-10 text-sm leading-5 text-gray-900  focus:ring-0"
              displayValue={(person) => person.name}
              onChange={(event) => setQuery(event.target.value)}
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
