(function (root) {
  var PropTypes = React.PropTypes;
  var findDOMNode = ReactDOM.findDOMNode;
  var DropTarget = ReactDnD.DropTarget;
  var DragSource = ReactDnD.DragSource;

  var cardSource = {
    beginDrag: function(props) {
      return {
        id: props.id,
        index: props.index
      };
    }
  };

  var cardTarget = {
    hover: function(props, monitor, component) {
      var dragIndex = monitor.getItem().index;
      var hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      var hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

      // Get vertical middle
      var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      var clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      var hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }
  };

  function collectSource(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    };
  }

  function collectTarget(connect) {
    return {
      connectDropTarget: connect.dropTarget()
    };
  }

  var Card = React.createClass({
    propTypes: {
      connectDragSource: PropTypes.func.isRequired,
      connectDropTarget: PropTypes.func.isRequired,
      index: PropTypes.number.isRequired,
      isDragging: PropTypes.bool.isRequired,
      id: PropTypes.any.isRequired,
      text: PropTypes.string.isRequired,
      moveCard: PropTypes.func.isRequired
    },

    render: function () {
      var isDragging = this.props.isDragging;
      var text = this.props.text;
      var connectDragSource = this.props.connectDragSource;
      var connectDropTarget = this.props.connectDropTarget;

      var opacity = isDragging ? 0 : 1;

      return connectDragSource(connectDropTarget(
        <div style={{
          opacity: isDragging ? 0.5 : 1,
          border: '1px dashed gray',
          padding: '0.5rem 1rem',
          marginBottom: '.5rem',
          backgroundColor: 'white',
          cursor: 'move'
        }}>
          {text}
        </div>
      ));
    }
  });

  root.Card = _.flow(
    DropTarget(ItemTypes.CARD, cardTarget, collectTarget),
    DragSource(ItemTypes.CARD, cardSource, collectSource)
  )(Card);
})(this);
