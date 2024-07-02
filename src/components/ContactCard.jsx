import { deleteDoc, doc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import { useDiscloure } from "../hooks/useDiscloure";
import { AddAndUpdateContact } from "./AddAndUpdateContact";
import { toast } from "react-toastify";

export default function ContactCard({ contact }) {
  const { isOpen, onClose, onOpen } = useDiscloure();
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contact", id));
      toast.success("Contact Deleted Succesfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={contact.id}
      className="bg-yellow flex justify-between p-2 border rounded-lg items-center"
    >
      <div className="flex gap-3">
        <HiOutlineUserCircle className="text-4xl text-orange-400 " />
        <div className="">
          <h2 className="font-medium">{contact.name}</h2>
          <p className="text-sm">{contact.email}</p>
        </div>
      </div>
      <div className="flex text-3xl">
        <RiEditCircleLine className="cursor-pointer" onClick={onOpen} />
        <IoMdTrash
          onClick={() => deleteContact(contact.id)}
          className="text-purple cursor-pointer"
        />
        <AddAndUpdateContact
          contact={contact}
          isOpen={isOpen}
          isUpdate
          onClose={onClose}
        />
      </div>
    </div>
  );
}
