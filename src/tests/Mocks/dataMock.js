export const INITIAL_RANKING = [
    { name: 'jogador1', picture: 'https://www.gravatar.com/avatar/f970e2767d0cfe75876ea857f92e319b', score: 179 },
    { name: 'jogador2', picture: 'https://www.gravatar.com/avatar/be343b5e35028635a6cd02ee72655332', score: 170 }
]

export const INITAL_STORE = {
    player: {
        name: "Alguem",
        assertions: 0,
        score: 0,
        gravatarEmail: "alguem@algum.com",
        imgURL: "https://www.gravatar.com/avatar/be343b5e35028635a6cd02ee72655332",
        token: "0b03b51ebc8a17ff01e33b0f60bea081d328ec13ae8caaba9fb2b6e660b09ddd",
    },
    trivia: {},
}

export const INITAL_STORE_2 = {
    player: {
        name: "Alguem",
        assertions: 4,
        score: 200,
        gravatarEmail: "alguem@algum.com",
        imgURL: "https://www.gravatar.com/avatar/be343b5e35028635a6cd02ee72655332",
        token: "0b03b51ebc8a17ff01e33b0f60bea081d328ec13ae8caaba9fb2b6e660b09ddd",
    }
}

export const requestToken1 = {
    "response_code": 0,
    "response_message": "Token Generated Successfully!",
    "token": "888623ec4f321ad14b91dc8fd438601f385370283c4ca53441e76453830153df"
}

export const requestToken2 = {
    "response_code": 0,
    "response_message": "Token Generated Successfully!",
    "token": "73e530011f2e96921ce8098159875fe4a1e62f35231310c9261868ea8df8a2ea"
}

export const MD5_1 = 'https://www.gravatar.com/avatar/a8f5f167f44f4964e6c998dee827110c'

export const requestQuestions = [
    {
        "category": "General Knowledge",
        "type": "multiple",
        "difficulty": "medium",
        "question": "In a standard set of playing cards, which is the only king without a moustache?",
        "correct_answer": "Hearts",
        "incorrect_answers": [
            "Spades",
            "Diamonds",
            "Clubs"
        ]
    },
    {
        "category": "Entertainment: Video Games",
        "type": "multiple",
        "difficulty": "hard",
        "question": "Which of these characters was considered, but ultimately not included, for Super Smash Bros. Melee?",
        "correct_answer": "James Bond",
        "incorrect_answers": [
            "Diddy Kong",
            "Mega Man",
            "Wave Racer"
        ]
    },
    {
        "category": "Entertainment: Video Games",
        "type": "multiple",
        "difficulty": "hard",
        "question": "In &quot;The Witness&quot;, how many lasers must be activated to get into the mountain area?",
        "correct_answer": "7",
        "incorrect_answers": [
            "8",
            "5",
            "12"
        ]
    },
    {
        "category": "History",
        "type": "multiple",
        "difficulty": "medium",
        "question": "When did O, Canada officially become the national anthem?",
        "correct_answer": "1980",
        "incorrect_answers": [
            "1950",
            "1920",
            "1880"
        ]
    },
    {
        "category": "Entertainment: Video Games",
        "type": "multiple",
        "difficulty": "hard",
        "question": "Counting the Blood and Wine DLC, how many Hero Cards are there in total in The Witcher 3?",
        "correct_answer": "25",
        "incorrect_answers": [
            "30",
            "20",
            "15"
        ]
    }
]
