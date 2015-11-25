(function (root) {
  root.SortableSimple = React.createClass({
    render: function () {
      return (
        <div>
          <p>
            <b><a href='https://github.com/gaearon/react-dnd/tree/master/examples/04%20Sortable/Simple'>Browse the Source</a></b>
          </p>
          <p>
            It is easy to implement a sortable interface with React DnD. Just make the same component both a drag source and a drop target, and reorder the data in the <code>hover</code> handler.
          </p>
          <Container />
        </div>
      );
    }
  });
})(this);
