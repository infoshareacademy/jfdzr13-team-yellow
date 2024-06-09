// const users = [{
//     email: "",
//     firstName: "",
//     lastName: "",
//     city: "",
//     phone: "",
//     description: "",
//     listings: [
//       {offer: [{
//         title: "",
//         description: "", 
//         foto:[], 
//         location: "", 
//         category: ""}]},
//       {search: [{
//         title: "",
//         description: "", 
//         foto:[], 
//         location: "", 
//         category: ""}]},
//       ]
//   }]
  

export const mockUsers = [{
    email: "user1@yt.pl",
    password: "Test1234",
    firstName: "Karol",
    lastName: "Nowak",
    city: "Szczecin, Zachodniopomorskie",
    phone: "555-111-2222",
    description: "Student architektury z zamiłowaniem do ogrodnictwa.",
    listings: [
      {offer: [
        {title: "Pomoc w projektowaniu ogrodu", description: "Oferuję pomoc w zaprojektowaniu i założeniu ogrodu. Posiadam doświadczenie w projektowaniu przestrzeni zielonych.", foto:[], location: "Szczecin, Zachodniopomorskie", category: "Dom i ogród"},
        {title: "Pomoc w renowacji mebli", description: "Oferuję pomoc w renowacji mebli drewnianych. Mam doświadczenie w malowaniu i renowacji mebli.", foto:[], location: "Szczecin, Zachodniopomorskie", category: "Dom i ogród"}
      ]},
      {search: [
        {title: "Opieka nad roślinami", description: "Poszukuję kogoś do podlewania roślin w moim domu podczas mojej nieobecności.", foto:[], location: "Szczecin, Zachodniopomorskie", category: "Dom i ogród"}
      ]}
    ]
  },
  {
    email: "user2@yt.pl",
    password: "Test1234",
    firstName: "Magdalena",
    lastName: "Kowalczyk",
    city: "Szczecin, Zachodniopomorskie",
    phone: "555-222-3333",
    description: "Nauczycielka angielskiego z zamiłowaniem do zdrowego gotowania.",
    listings: [
      {offer: [
        {title: "Lekcje języka angielskiego", description: "Oferuję lekcje języka angielskiego dla dzieci i dorosłych.", foto:[], location: "Szczecin, Zachodniopomorskie", category: "Edukacja"},
        {title: "Pomoc w organizacji imprez", description: "Oferuję pomoc w organizacji imprez okolicznościowych. Posiadam doświadczenie w planowaniu i koordynowaniu wydarzeń.", foto:[], location: "Szczecin, Zachodniopomorskie", category: "Hobby i rozrywka"}
      ]},
      {search: [
        {title: "Opieka nad psem", description: "Poszukuję opieki nad psem podczas mojej nieobecności. Dog niemiecki, wielki pies. Nie gryzie", foto:[], location: "Szczecin, Zachodniopomorskie", category: "Zwierzęta"}
      ]}
    ]
  },
  {
    email: "user3@yt.pl",
    password: "Test1234",
    firstName: "Adam",
    lastName: "Lewandowski",
    city: "Szczecin, Zachodniopomorskie",
    phone: "555-333-4444",
    description: "Inżynier zainteresowany rozwojem osobistym i zdrowym stylem życia.",
    listings: [
      {offer: [
        {title: "Pomoc w treningu", description: "Oferuję pomoc w planowaniu i wykonywaniu treningów siłowych.", foto:[], location: "Szczecin, Zachodniopomorskie", category: "Sport i rekreacja"},
        {title: "Opieka nad dziećmi", description: "Oferuję opiekę nad dziećmi w wieku przedszkolnym. Jestem odpowiedzialna i kreatywna.", foto:[], location: "Szczecin, Zachodniopomorskie", category: "Dom i ogród"}
      ]},
      {search: [
        {title: "Praca zdalna jako asystent", description: "Poszukuję pracy zdalnej jako asystent. Mam doświadczenie w organizacji czasu oraz obsłudze biura.", foto:[], location: "Szczecin, Zachodniopomorskie", category: "Technologia i IT"}
      ]}
    ]
  },
  {
    email: "user4@yt.pl",
    password: "Test1234",
    firstName: "Monika",
    lastName: "Dąbrowska",
    city: "Gdańsk, Pomorskie",
    phone: "555-444-5555",
    description: "Studenka sztuk pięknych z zamiłowaniem do rowerów i zdrowego stylu życia.",
    listings: [
      {offer: [
        {title: "Warsztaty malowania", description: "Oferuję warsztaty malowania i rysunku dla dzieci i dorosłych.", foto:[], location: "Gdańsk, Pomorskie", category: "Hobby i rozrywka"},
        {title: "Opieka nad dziećmi", description: "Oferuję opiekę nad dziećmi w wieku przedszkolnym. Jestem odpowiedzialna i kreatywna.", foto:[], location: "Gdańsk, Pomorskie", category: "Dom i ogród"}
      ]},
      {search: [
        {title: "Opieka nad zwierzętami", description: "Poszukuję opieki nad kotem. Kot wymaga zabawy.", foto:[], location: "Gdańsk, Pomorskie", category: "Zwierzęta"}
      ]}
    ]
  },
  {
    email: "user5@yt.pl",
    password: "Test1234",
    firstName: "Marcin",
    lastName: "Kamiński",
    city: "Gdańsk, Pomorskie",
    phone: "555-555-6666",
    description: "Kucharz amator z zamiłowaniem do podróży i fotografii.",
    listings: [
      {offer: [
        {title: "Kurs gotowania", description: "Oferuję kurs gotowania dla początkujących i zaawansowanych.", foto:[], location: "Gdańsk, Pomorskie", category: "Dom i ogród"},
        {title: "Opieka nad zwierzętami", description: "Poszukuję opieki nad psem w weekendy.", foto:[], location: "Gdańsk, Pomorskie", category: "Zwierzęta"}
      ]},
      {search: [
        {title: "Przeprowadzki", description: "Poszukuję pomocy przy przeprowadzce mebli do nowego mieszkania.", foto:[], location: "Gdańsk, Pomorskie", category: "Transport i logistyka"}
      ]}
    ]
  },
  {
    email: "user6@yt.pl",
    password: "Test1234",
    firstName: "Alicja",
    lastName: "Woźniak",
    city: "Gdańsk, Pomorskie",
    phone: "555-666-7777",
    description: "Grafik z zamiłowaniem do jogi i sztuki kulinarnych.",
    listings: [
      {offer: [
        {title: "Projektowanie logo", description: "Oferuję projektowanie logo dla firm i osób prywatnych.", foto:[], location: "Gdańsk, Pomorskie", category: "Inne"},
        {title: "Pomoc w ogrodzie", description: "Oferuję pomoc w pielęgnacji ogrodu ok 100m2.", foto:[], location: "Gdańsk, Pomorskie", category: "Dom i ogród"}
      ]},
      {search: [
        {title: "Opieka nad dziećmi", description: "Poszukuję opieki nad dziećmi po szkole 12l oraz 8l.", foto:[], location: "Gdańsk, Pomorskie", category: "Dom i ogród"}
      ]}
    ]
  },
];
