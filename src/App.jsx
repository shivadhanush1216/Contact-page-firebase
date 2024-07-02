import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { FiSearch } from "react-icons/fi";
import { IoIosAddCircle, IoMdTrash } from "react-icons/io";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { firebase, db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import { Modal } from "./components/Modal";
import { AddAndUpdateContact } from "./components/AddAndUpdateContact";
import { useDiscloure } from "./hooks/useDiscloure";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotFoundContact } from "./components/NotFoundContact";
export default function App() {
  const [Contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDiscloure();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contact");

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContact = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contact");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContact = contactLists.filter((Contact) =>
        Contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContact);
      return filteredContact;
    });
  };

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <NavBar></NavBar>
        <div className="flex relative items-center gap-2">
          <FiSearch className="absolute ml-2 text-2xl text-white" />
          <input
            onChange={filterContact}
            type="text"
            className="flex-grow bg-transparent h-10 w-72 border border-white-500 rounded-xl text-white pl-10"
            placeholder="Search Contact"
          />
          <IoIosAddCircle
            className="text-5xl text-white cursor-pointer"
            onClick={onOpen}
          />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {Contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            Contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
}
