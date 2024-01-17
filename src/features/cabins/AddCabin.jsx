import { useState } from "react";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  // State for the modal status
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setIsOpenModal((isOpen) => !isOpen);
        }}
      >
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
