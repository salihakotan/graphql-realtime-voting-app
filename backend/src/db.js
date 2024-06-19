const questions = [
    {
        id:"1",
        title:"Night or Morning",
        options: [
            {
                id:"1",
                text:"Night",
                question_id:"1"
            },
            {
                id:"2",
                text:"Morning",
                question_id:"1"
            },
            {
                id:"3",
                text:"Both",
                question_id:"1"
            }
        ]
    },
    {
        id:"2",
        title:"Tea or Coffee",
        options: [
            {
                id:"4",
                text:"Tea",
                question_id:"2"
            },
            {
                id:"5",
                text:"Coffee",
                question_id:"2"
            },
            {
                id:"6",
                text:"Both",
                question_id:"2"
            }
        ]
    },
    {
        id:"3",
        title:"Work or Sleep",
        options: [
            {
                id:"7",
                text:"Work",
                question_id:"3"
            },
            {
                id:"8",
                text:"Sleep",
                question_id:"3"
            },
            {
                id:"9",
                text:"Both",
                question_id:"3"
            }
        ]
    }
]


const votes = [
    {
        id:"1",
        question_id:"1",
        option_id:"1",
    },
    {
        id:"2",
        question_id:"3",
        option_id:"8",
    },
    {
        id:"3",
        question_id:"2",
        option_id:"6",
    },
    {
        id:"4",
        option_id:"4",
        question_id:"2"
    },
    {
        id:"5",
        option_id:"5",
        question_id:"2"
    },
    {
        id:"6",
        option_id:"6",
        question_id:"2"
    },
    {
        id:"7",
        option_id:"7",
        question_id:"3"
    },
    {
        id:"8",
        option_id:"8",
        question_id:"3"
    },
    {
        id:"9",
        option_id:"9",
        question_id:"3"
    }
]


const options = [
    {
        id:"1",
        text:"Night",
        question_id:"1",
    },
    {
        id:"2",
        text:"Morning",
        question_id:"1",
    },
    {
        id:"3",
        text:"Both",
        question_id:"1",
    },
    {
        id:"4",
        text:"Tea",
        question_id:"2",
    },
    {
        id:"5",
        text:"Coffee",
        question_id:"2",
    },
    {
        id:"6",
        text:"Both",
        question_id:"2",
    },
    {
        id:"7",
        text:"Work",
        question_id:"3",
    },
    {
        id:"8",
        text:"Sleep",
        question_id:"3",
    },
    {
        id:"9",
        text:"Both",
        question_id:"3",
    }
]

const db = {
    questions,
    votes,
    options
}

export {db}