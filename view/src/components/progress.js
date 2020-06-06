import React, { useState, setState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { authMiddleWare } from '../util/auth';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: "64px 24px"
	},
  todoGridContainer: {
    background: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    margin: '16px 0',
    padding: '24px 6px',
  },
  column: {
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  }
})

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" }
];

const columnsFromBackend = {
  [uuid()]: {
    columnName: "Requested",
    items: itemsFromBackend
  },
  [uuid()]: {
    columnName: "Assigned",
    items: []
  },
  [uuid()]: {
    columnName: "In Progress",
    items: []
  },
  [uuid()]: {
    columnName: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function Progress(props) {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [todos, setTodos] = useState();
  const history = props.history;
  const { classes } = props;

  useEffect(() => {
    authMiddleWare(history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get('/progress')
      .then((response) => {
        setTodos({
          todos: response.data,
          uiLoading: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [todos]);

  return (
    <main className={classes.content}
    styles={{
      marginTop: "24px"
    }}>
      <div
        className={styles.todoGridContainer}
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          background: '#fff',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          margin: '16px 0',
          padding: '24px 6px',
          borderRadius: '2px'
        }}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <Typography variant="h6">{column.columnName}</Typography>
                <div style={{
                  margin: 8,
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className={styles.column}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#ff9e642e"
                              : "#FFF",
                            padding: 4,
                            width: 250,
                            minHeight: 500
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#FF9E64"
                                          : "#4ecdc4",
                                        color: "white",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </main>
  );
}
/* 
export default TodoGrid; */
export default withStyles(styles)(Progress);