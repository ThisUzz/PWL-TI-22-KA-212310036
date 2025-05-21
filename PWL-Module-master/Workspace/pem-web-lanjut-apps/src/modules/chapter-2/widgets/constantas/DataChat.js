const Chat_1 = [
    { id: 1, from_id: "0419029203", messages: "P", date: "2024-02-22 10:30:00", to_user_id: "123" },
    { id: 2, from_id: "123", messages: "Ke pasar beli mangga", date: "2024-02-22 10:30:00", to_user_id: "0419029203" },
    { id: 3, from_id: "123", messages: "Tapi lupa untuk dibawa", date: "2024-02-22 10:30:00", to_user_id: "0419029203" },
    { id: 4, from_id: "0419029203", messages: "Eeeaaaa", date: "2024-02-22 10:45:00", to_user_id: "123" },
    { id: 5, from_id: "123", messages: "Sedang semangat kejar cinta", date: "2024-02-22 10:53:00", to_user_id: "0419029203" },
    { id: 6, from_id: "123", messages: "Tapi dia dengan orang yang buat luka", date: "2024-02-22 10:53:00", to_user_id: "0419029203" }
]

const Chat_2 = [
    { id: 1, from_id: "321", messages: "Nanya dong", date: "2024-02-22 20:10:00", to_user_id: "0419029203" },
    { id: 2, from_id: "0419029203", messages: "Kenapa?", date: "2024-02-22 20:15:00", to_user_id: "321" },
    { id: 3, from_id: "321", messages: "Singkong yang difermentasi itu namanya apa ?", date: "2024-02-22 20:15:00", to_user_id: "0419029203" },
    { id: 4, from_id: "321", messages: "Cape ya..", date: "2024-02-22 20:10:00", to_user_id: "0419029203" },
    { id: 5, from_id: "0419029203", messages: "Steak yang kematengan itu disebut apa ya ?", date: "2024-02-22 20:10:00", to_user_id: "321" },
    { id: 6, from_id: "0419029203", messages: "We're done ya..", date: "2024-02-22 20:10:00", to_user_id: "321" },
]

const Messegers = [{ chat_id: 1, user_id: "123", messages: Chat_1 },
{ chat_id: 2, user_id: "321", messages: Chat_2 }];

const MyFriend = [
    { id: 3, user_id: "123", name: "Septian" },
    { id: 1, user_id: "321", name: "Jemi" },
    { id: 2, user_id: "456", name: "Edi" },
    { id: 4, user_id: "789", name: "Suci" },
    { id: 5, user_id: "987", name: "Isnan" },
    { id: 6, user_id: "585", name: "Anton" },
]
export { Messegers, MyFriend };