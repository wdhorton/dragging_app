(function (root) {
  var style = {
    width: 400
  };

  var Container = React.createClass({
    getInitialState: function () {
      return {
        cards: [{
          id: 1,
          text: 'Write a cool JS library'
        }, {
          id: 2,
          text: 'Make it generic enough'
        }, {
          id: 3,
          text: 'Write README'
        }, {
          id: 4,
          text: 'Create some examples'
        }, {
          id: 5,
          text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)'
        }, {
          id: 6,
          text: '???'
        }, {
          id: 7,
          text: 'PROFIT'
        }]
      };
    },

    moveCard: function (dragIndex, hoverIndex) {
      var cards = this.state.cards.slice();
      var dragCard = cards[dragIndex];

      this.setState({cards: cards.splice(dragIndex, 1).splice(hoverIndex, 0, dragCard)});
    },

    render: function () {
      var cards = this.state.cards;

      return (
        <div style={style}>
          {
            cards.map(function(card, i) {
              return (
                <Card key={card.id}
                      index={i}
                      id={card.id}
                      text={card.text}
                      moveCard={this.moveCard} />
              );
            }.bind(this))
          }
        </div>
      );
    }
  });

  root.Container = ReactDnD.DragDropContext(ReactDnDHTML5Backend)(Container);
})(this);
