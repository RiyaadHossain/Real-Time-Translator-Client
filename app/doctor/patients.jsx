import UserListing from "../../components/UserListing";

const patients = [
  {
    id: "1",
    name: "Alice Johnson",
    age: 30,
    gender: "Female",
    email: "alice@example.com",
  },
  {
    id: "2",
    name: "Bob Smith",
    age: 45,
    gender: "Male",
    email: "bob@example.com",
  },
  {
    id: "3",
    name: "Catherine Liu",
    age: 28,
    gender: "Female",
    email: "catherine@example.com",
  },
];

export default function PatientsList() {

  return (
   <UserListing
      users={patients}
      title="Patients"
    />
  );
}
