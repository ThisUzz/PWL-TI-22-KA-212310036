const ListLanguage = ['id-ID', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'ja-JP', 'ko-KR', 'zh-CN'];
const VoiceGender = [{ name: 'Microsoft David Desktop - English (United States)', gender: 'M', lang: "en-US" },
{ name: 'Google Bahasa Indonesia', gender: 'F', lang: "id-ID" }];

let selectedVoice;

window.speechSynthesis.onvoiceschanged = function () {
    const voices = window.speechSynthesis.getVoices();

    selectedVoice = voices.find(voice => voice.name === VoiceGender[1].name);
};

const HandlePlay = (chat) => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = chat;
    utterance.lang = ListLanguage[1];

    utterance.voice = selectedVoice;

    window.speechSynthesis.speak(utterance);

};

const PlayTheAllChat = (chat, selectedUser, myid) => {
    let arrayChat = [];
    const sortedChats = chat.sort((a, b) => new Date(a.date) - new Date(b.date));
    //slicing sender
    arrayChat.push("Pesan dari " + selectedUser.name);
    //end slicing sender

    //slicing message user
    let lastFromId = "";
    let combinedMessages = [];

    // Outputkan hasil susunan chat sesuai dengan urutan tanggal
    sortedChats.forEach((chat, index) => {
        // Jika from_id sama dengan pesan sebelumnya, gabungkan pesan-pesan
        if (chat.from_id === lastFromId) {
            combinedMessages.push(chat.messages);
            //arrayChat.push(chat.messages);
        } else {
            // Jika tidak sama, cetak pesan baru
            if (combinedMessages.length > 0) {
                let msg = `${lastFromId === myid ? "Anda "+(index === 1 ? "menulis":"menjawab")+": " : selectedUser.name+" berkata: "} "${combinedMessages.join(', ')}"`;
                arrayChat.push(msg);
                combinedMessages = [];
            }
            lastFromId = chat.from_id;
            combinedMessages.push(chat.messages);
        }

        // Cetak pesan terakhir jika sudah mencapai iterasi terakhir
        if (index === sortedChats.length - 1 && combinedMessages.length > 0) {
            let msg = `${chat.from_id === myid ? "Anda "+(index === 1 ? "menulis ":"menjawab ") : selectedUser.name+" berkata: "}: "${combinedMessages.join(', ')}"`;
            arrayChat.push(msg);
        }
    });

    //read the messeges
    arrayChat.map(chat => {
        HandlePlay(chat)
    })
    //end read
}


export { HandlePlay, PlayTheAllChat }