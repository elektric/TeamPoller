export default (props) => {
  const bsStyle = "success";
  return (
      <Button bsStyle={bsStyle} onClick={props.handleClick}>
        <Glyphicon glyph="plus" />
      </Button>
  );
};