import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import Modal from "./Modal";

const Details = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error(
      "why did you not give me an id?!!! I wanted an id. I have no id."
    );
  }

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const results = useQuery(["details", id], fetchPet);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🕗</h2>
      </div>
    );
  }

  const pet = results?.data?.pets[0];
  if (!pet) {
    throw new Error("no pet lol");
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal},{pet.breed},{pet.city},{pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would like to adopt {pet.name}? </h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
      {id}
    </div>
  );
};

// passing props incase we have it then sprde it since we do not care about it
//we just need to wrap the component with errro boundery
function detailsErrorBoundery() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default detailsErrorBoundery;
