import React from 'react';
import TrelloCard from './TrelloCard';
import TrelloActionButton from './TrelloActionButton';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';


const ListContainer = styled.div`
  background-color: #ccc;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  margin-right: 10px;
  margin-left: 20px;
  height: 100%;
`;

const TrelloList = ({title, cards, listID, index}) => {
  return(
    <Draggable draggableId={String(listID)} index={index}>
    {provided =>(
      <ListContainer
      {...provided.draggableProps}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      >
        <Droppable droppableId={String(listID)}>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <h3>{title}</h3>
              {cards.map((card, index) =>
                (<TrelloCard
                  key={card.id}
                  index={index}
                  text={card.text}
                  id={card.id} />))}
              <TrelloActionButton listID={listID}/>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </ListContainer>
    )}
    </Draggable>
  )
}


export default TrelloList;