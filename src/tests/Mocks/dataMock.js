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
    trivia: {
        questions: [
          {
            category: 'Entertainment: Video Games',
            type: 'multiple',
            difficulty: 'hard',
            question: 'In the original &quot;Super Mario Bros.&quot;, what is the acceleration of Mario if he was in free fall?',
            correct_answer: '91.28 m/s^2',
            incorrect_answers: [
              '110  m/s^2',
              '9.42  m/s^2',
              '4.4  m/s^2'
            ]
          },
          {
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'What is the code name for the mobile operating system Android 7.0?',
            correct_answer: 'Nougat',
            incorrect_answers: [
              'Ice Cream Sandwich',
              'Jelly Bean',
              'Marshmallow'
            ]
          },
          {
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'medium',
            question: 'In HTML, which non-standard tag used to be be used to make elements scroll across the viewport?',
            correct_answer: '&lt;marquee&gt;&lt;/marquee&gt;',
            incorrect_answers: [
              '&lt;scroll&gt;&lt;/scroll&gt;',
              '&lt;move&gt;&lt;/move&gt;',
              '&lt;slide&gt;&lt;/slide&gt;'
            ]
          },
          {
            category: 'Entertainment: Cartoon & Animations',
            type: 'multiple',
            difficulty: 'easy',
            question: 'In the show &quot;Steven Universe&quot;, who are the main two employees of The Big Donut?',
            correct_answer: 'Sadie and Lars',
            incorrect_answers: [
              'Steven and James',
              'Erik and Julie',
              'Bob and May'
            ]
          },
          {
            category: 'Science & Nature',
            type: 'multiple',
            difficulty: 'easy',
            question: 'What animal takes part in Schr&ouml;dinger&#039;s most famous thought experiment?',
            correct_answer: 'Cat',
            incorrect_answers: [
              'Dog',
              'Bat',
              'Butterfly'
            ]
          }
        ],
        current_question: 0
      },
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
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'hard',
      question: 'In the original &quot;Super Mario Bros.&quot;, what is the acceleration of Mario if he was in free fall?',
      correct_answer: '91.28 m/s^2',
      incorrect_answers: [
        '110  m/s^2',
        '9.42  m/s^2',
        '4.4  m/s^2'
      ]
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What is the code name for the mobile operating system Android 7.0?',
      correct_answer: 'Nougat',
      incorrect_answers: [
        'Ice Cream Sandwich',
        'Jelly Bean',
        'Marshmallow'
      ]
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'medium',
      question: 'In HTML, which non-standard tag used to be be used to make elements scroll across the viewport?',
      correct_answer: '&lt;marquee&gt;&lt;/marquee&gt;',
      incorrect_answers: [
        '&lt;scroll&gt;&lt;/scroll&gt;',
        '&lt;move&gt;&lt;/move&gt;',
        '&lt;slide&gt;&lt;/slide&gt;'
      ]
    },
    {
      category: 'Entertainment: Cartoon & Animations',
      type: 'multiple',
      difficulty: 'easy',
      question: 'In the show &quot;Steven Universe&quot;, who are the main two employees of The Big Donut?',
      correct_answer: 'Sadie and Lars',
      incorrect_answers: [
        'Steven and James',
        'Erik and Julie',
        'Bob and May'
      ]
    },
    {
      category: 'Science & Nature',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What animal takes part in Schr&ouml;dinger&#039;s most famous thought experiment?',
      correct_answer: 'Cat',
      incorrect_answers: [
        'Dog',
        'Bat',
        'Butterfly'
      ]
    }
  ]
