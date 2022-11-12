import { useState, useContext, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import fetchSearch from "./fetchSearch";
import Results from "./Results";
import useBreedList from "./useBreedList";
import { Animal } from "./APIResponsesTypes";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];
const SearchParams = () => {
  const [requestPrams, setRequestPrams] = useState({
    location: "",
    animal: "" as Animal,
    breed: "",
  });
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestPrams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  const [isPending, startTransition] = useTransition();
  // const deferredPets = useDeferredValue(pets);
  // const renderPets = useMemo(
  //   () => <Results pets={deferredPets} />,
  //   [deferredPets]
  // );

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal:
              (formData.get("animal")?.toString() as Animal) ?? ("" as Animal),
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          startTransition(() => {
            setRequestPrams(obj);
          });
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input name="location" id="location" placeholder="location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />

            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" disabled={breeds.length === 0} name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>

        {isPending ? (
          <div className="mini loading-pane">
            <h2 className="loader">⏳</h2>
          </div>
        ) : (
          <button>Submit</button>
        )}
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
