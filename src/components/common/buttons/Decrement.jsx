export default (props) => {
  const bsStyle = "danger";
  return (
      <Button bsStyle={bsStyle} onClick={props.handleClick}>
        <Glyphicon glyph="minus" />
      </Button>
  );
};