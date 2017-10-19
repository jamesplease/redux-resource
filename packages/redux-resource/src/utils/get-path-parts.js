// Given a path, such as "meta[24].readStatus", this will return an array of "path parts." In
// that example, the path parts would be ['meta', '24', 'readStatus'].
// This method supports dot notation as well as bracket notation.
export default function getPathParts(path) {
  const parts = [];
  let i = 0;
  let nextDot, nextOpenBracket, openQuote, nextCloseBracket;

  while (i < path.length) {
    nextDot = path.indexOf('.', i);
    nextOpenBracket = path.indexOf('[', i);

    // When there are no dots nor opening brackets ahead of the
    // current index, then we've reached the final path part.
    if (nextDot === -1 && nextOpenBracket === -1) {
      parts.push(path.slice(i, path.length));
      i = path.length;
    }

    // This handles dots. When there are no more open brackets, or the next dot is before
    // the next open bracket, then we simply add the path part.
    else if (nextOpenBracket === -1 || (nextDot !== -1 && nextDot < nextOpenBracket)) {
      parts.push(path.slice(i, nextDot));
      i = nextDot + 1;
    }

    // If neither of the above two conditions are met, then we're dealing with a bracket.
    else {
      if (nextOpenBracket > i) {
        parts.push(path.slice(i, nextOpenBracket));
        i = nextOpenBracket;
      }

      openQuote = path.slice(nextOpenBracket + 1, nextOpenBracket + 2);

      // This handles the situation when we do not have quotes. For instance, [24] or [asdf]
      if (openQuote !== '"' && openQuote !== "'") {
        nextCloseBracket = path.indexOf(']', nextOpenBracket);
        if (nextCloseBracket === -1) {
          nextCloseBracket = path.length;
        }
        parts.push(path.slice(i + 1, nextCloseBracket));
        i = (path.slice(nextCloseBracket + 1, nextCloseBracket + 2) === '.') ? nextCloseBracket + 2 : nextCloseBracket + 1;
      }

      // This handles brackets that are wrapped in quotes. For instance, ["hello"] or ['24']
      else {
        nextCloseBracket = path.indexOf(`${openQuote}]`, nextOpenBracket);
        if (nextCloseBracket === -1) {
          nextCloseBracket = path.length;
        }
        parts.push(path.slice(i + 2, nextCloseBracket));
        i = (path.slice(nextCloseBracket + 2, nextCloseBracket + 3) === '.') ? nextCloseBracket + 3 : nextCloseBracket + 2;
      }
    }
  }

  return parts;
}
