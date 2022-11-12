import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

// we can use null instead of defult obj
//but now we do not have to check in the other files if it is null or not
const AdoptedPetContext = createContext<
  [Pet | null, (adoptedPet: Pet) => void]
>([
  {
    id: 1337,
    name: "Fido",
    animal: "dog",
    description: "lorem ispusm",
    breed: "beagle",
    images: [],
    city: "Seattle",
    state: "WA",
  },
  () => {},
]);

export default AdoptedPetContext;
