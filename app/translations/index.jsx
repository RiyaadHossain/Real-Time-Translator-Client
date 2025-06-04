import TranslationScreen from "../../components/TranslationListing";


const translations = [
  {
    id: "1",
    fromLanguage: "English",
    toLanguage: "Urdu",
    duration: 740,
    date: "2023-05-15",
  },
  {
    id: "2",
    fromLanguage: "English",
    toLanguage: "Arabic",
    duration: 245,
    date: "2023-05-10",
  },
  {
    id: "3",
    fromLanguage: "English",
    toLanguage: "Bangla",
    duration: 512,
    date: "2023-05-05",
  },
  {
    id: "4",
    fromLanguage: "Bangla",
    toLanguage: "Spanish",
    duration: 1600,
    date: "2023-04-28",
  },
];

export default function recordings() {
  return <TranslationScreen translations={translations} />;
}
