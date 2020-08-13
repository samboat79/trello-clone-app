import React, {Component} from 'react';
import TrelloList from './TrelloList';
import {connect} from 'react-redux';
import TrelloActionButton from './TrelloActionButton';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {sort} from '../actions';
import styled from 'styled-components';


const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class App extends Component {

  onDragEnd = (result) => {
    //TODO: reordering logic
    const {destination, source, draggableId, type} = result;
    if(!destination) {
      return;
    }
    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      ));
  }

  render() {
    const {lists} = this.props;

  return (
    <DragDropContext onDragEnd={this.onDragEnd}>
      <div>
        <h1 style={{color:"white", margin: 30}}>My Trello App</h1>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
              <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                {lists.map((list, index) => (
                  <TrelloList
                  listID={list.id}
                  index={index}
                  key={list.id}
                  title={list.title}
                  cards={list.cards} />)
                )}
                <TrelloActionButton list />
              </ListContainer>
            )}
          </Droppable>
      </div>
    </DragDropContext>
  );
}
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps) (App);