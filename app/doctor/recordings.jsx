import CallRecordingScreen from "../../components/RecordingListing";

const callRecordings = [
  {
    id: "1",
    userName: "Sarah Johnson",
    userEmail: "sarah.johnson@example.com",
    duration: 740,
    date: "2023-05-15",
  },
  {
    id: "2",
    userName: "Michael Chen",
    userEmail: "michael.chen@example.com",
    duration: 245,
    date: "2023-05-10",
  },
  {
    id: "3",
    userName: "Robert Wilson",
    userEmail: "robert.wilson@example.com",
    duration: 512,
    date: "2023-05-05",
  },
  {
    id: "4",
    userName: "Emily Davis",
    userEmail: "emily.davis@example.com",
    duration: 1600,
    date: "2023-04-28",
  },
];

export default function recordings() {
  return <CallRecordingScreen callRecordings={callRecordings} />;
}
