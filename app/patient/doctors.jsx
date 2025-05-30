import UserListing from "../../components/UserListing";

const doctors = [
  {
    id: "1",
    name: "Dr. Alice Johnson",
    age: 30,
    gender: "Female",
    email: "alice@example.com",
  },
  {
    id: "2",
    name: "Dr. Bob Smith",
    age: 45,
    gender: "Male",
    email: "bob@example.com",
  },
  {
    id: "3",
    name: "Dr. Catherine Liu",
    age: 28,
    gender: "Female",
    email: "catherine@example.com",
  },
];

export default function DoctorsList() {

  return (
    <UserListing
          users={doctors}
          title="Doctors"
        />
  );
}
