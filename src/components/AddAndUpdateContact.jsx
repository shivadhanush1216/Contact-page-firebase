import { ErrorMessage, Field, Form, Formik } from "formik";
import { Modal } from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid email").required("E-mail is required"),
});
export const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contact");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Succesfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contact", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated Succesfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-2 ">
            <div className="flex flex-col gap-1 ">
              <label htmlFor="name">Name</label>
              <Field
                name="name"
                className="border-[1.5px] border-black-500 h-10 p-2 rounded-lg"
              />
              <div className="text-xs text-orange-800">
                <ErrorMessage name="name"></ErrorMessage>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">E-mail</label>
              <Field
                type="email"
                name="email"
                className="border-[1.5px] border-black-500 h-10 p-2 rounded-lg"
              />
              <div className="text-xs text-orange-800">
                <ErrorMessage name="email"></ErrorMessage>
              </div>
            </div>
            <button className="self-end border-[1.5px] mt-4 p-1.5 bg-orange-300 rounded-md">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};
