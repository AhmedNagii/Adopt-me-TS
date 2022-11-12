import { Animal, BreedListAPIResponse } from "./APIResponsesTypes";
import { QueryFunction } from "@tanstack/react-query";

const fetchBreedList: QueryFunction<
  BreedListAPIResponse,
  ["breeds", Animal]
> = async ({ queryKey }) => {
  const animal = queryKey[1];
  //we do not need since we are sure it will be an animal
  //if (!animal) return [];

  const apiResposns = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );
  if (!apiResposns.ok) {
    throw new Error(`details/${animal} fetch is not ok`);
  }
  return apiResposns.json();
};

export default fetchBreedList;
