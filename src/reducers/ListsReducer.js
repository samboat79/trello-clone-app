import {Constants} from '../actions';

let listID = 2;
let cardID = 5;
const initialState = [
  {
    title: "Last Episode",
    id: `list-${0}`,
    cards: [
            { id: `card-${0}`,
              text: "Static Card"
            },
            { id: `card-${1}`,
              text: "2nd Static Card"
            }
          ]
  },
  {
    title: "New Episode",
    id: `list-${1}`,
    cards: [
            { id: `card-${2}`,
              text: "1st Static Card"
            },
            { id: `card-${3}`,
              text: "2nd Static Card"
            },
            { id: `card-${4}`,
              text: "3rd Static Card"
            }
          ]
  }
];

const ListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.AddLIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listID}`,
      };
      listID += 1;
      return [...state, newList];

    case Constants.AddCARD:
    {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`
      };
      cardID += 1;
    const newState = state.map(list => {
        if(list.id===action.payload.listID){
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });
      return newState;
    }

      case Constants.DragHAPPENED:
        const {
          droppableIdStart,
          droppableIdEnd,
          droppableIndexStart,
          droppableIndexEnd,
          draggableId,
          type
        } = action.payload;
        const newState = [...state];
        //dragging lists around
        if(type === "list") {
          const list = newState.splice(droppableIndexStart, 1);
          newState.splice(droppableIndexEnd, 0, ...list);
          return newState;
        }
        //when drag and drop happens in the same list
        if (droppableIdStart === droppableIdEnd) {
           const list = state.find(list => droppableIdStart===list.id);
           const card = list.cards.splice(droppableIndexStart, 1);
             list.cards.splice(droppableIndexEnd, 0, ...card)
         }
         //when drag and drop happens across lists
        if (droppableIdStart !== droppableIdEnd) {
          //identify the list where drag happened
          const listStart = state.find(list => droppableIdStart === list.id);
          //pull out the card from the list
          const card = listStart.cards.splice(droppableIndexStart, 1);
          //find list where drag ended
          const listEnd = state.find(list => droppableIdEnd === list.id);
          //put card in new list
          listEnd.cards.splice(droppableIndexEnd, 0, ...card)
        }

      return newState;
        default:
      return state;
  }};

export default ListsReducer;