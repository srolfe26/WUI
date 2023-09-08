const HIGHLIGHT_STYLE = 'highlighted-content';

/**
 * Removes existing highlight
 *
 * @param   {Node}      targetNode     A node to clear highlighted text spans out of
 * @returns {Node}      The node that was passed in
 */
const removeHighlight = (targetNode: Element): HTMLElement => {
    Array.from(targetNode.querySelectorAll(`.${HIGHLIGHT_STYLE}`)).forEach((elem: Node) => {
        const parentNode = elem.parentNode;

        if (parentNode && elem.firstChild) {
            parentNode.replaceChild(elem.firstChild, elem);
            parentNode.normalize();
        }
    });

    return targetNode as HTMLElement;
}

/**
 * Inserts a node after a reference node
 *
 * @param       {Node}  existingNode   The node after which new node will be inserted
 * @param       {Node}  newNode        The node to be added to the parent
 * @returns     {Node}  The new node that was passed in
 */
const addNodeAfter = (existingNode: Node, newNode: Node): Node => {
    existingNode.parentNode?.insertBefore(newNode, existingNode.nextSibling);

    return newNode;
}

/**
 * Highlights a specific text within a node
 *
 * @param   {Node}      textNode        A node to highlight text within
 * @param   {RegExp}    regexPattern    The regex of text to search for
 */
const highlightMatch = (textNode: Node, regexPattern: RegExp): void => {
    const parentNode = textNode.parentNode;
    const matchIndices: number[] = [];
    let match;
    const nodeText = textNode.nodeValue || '';
    let lastMatchIndex = 0;
    let referenceNode = textNode;

    if (textNode.nodeType !== Node.TEXT_NODE || !regexPattern) {
        return;
    }

    // Generate a list of match indices
    while ((match = regexPattern.exec(nodeText))) {
        matchIndices.push(match.index, regexPattern.lastIndex);
    }

    // If there are no matches, exit the function
    if (matchIndices.length === 0) {
        return;
    }

    matchIndices.forEach((indexVal, arrayIndex) => {
        if (arrayIndex % 2 === 0) {
            // Add plain text nodes for the spaces between the matches
            if (indexVal !== lastMatchIndex) {
                referenceNode = addNodeAfter(
                    referenceNode,
                    document.createTextNode(nodeText.slice(lastMatchIndex, indexVal))
                );
            }

            // Add spans to highlight matches
            const spanForHighlight = document.createElement('span');

            spanForHighlight.classList.add(HIGHLIGHT_STYLE);
            spanForHighlight.innerHTML = nodeText.slice(indexVal, matchIndices[arrayIndex + 1]);
            referenceNode = addNodeAfter(referenceNode, spanForHighlight);
        }
        else {
            lastMatchIndex = indexVal;
        }
    });

    // Add the end of the string and remove the original node
    if (lastMatchIndex !== nodeText.length) {
        addNodeAfter(referenceNode, document.createTextNode(nodeText.slice(lastMatchIndex)));
    }

    // Remove the original node after all replacements are done
    parentNode?.removeChild(textNode);
}

/**
 * Recursive function that highlights text nodes or descends down to them to perform highlighting
 *
 * @param   {Node}      targetNode        An object with text to highlight
 * @param   {RegExp}    searchPattern     A regular expression matching the desired text to highlight
 */
const applyTextHighlight = (targetNode: Node, searchPattern: RegExp): HTMLElement => {
    // There may be previous highlighting
    if (targetNode instanceof Element) {
        removeHighlight(targetNode);
    }

    // Previous highlighting may have fragmented text nodes. Restore them:
    targetNode.normalize();

    Array.from(targetNode.childNodes).forEach((childNode) => {
        // Act on non-blank text nodes, else recurse
        if (childNode.nodeType === 3 && childNode.nodeValue && childNode.nodeValue.replace(/^\s+|\s+$/g, '').length > 0) {
            highlightMatch(childNode, searchPattern);
        }
        else if (childNode.hasChildNodes() && childNode instanceof Element) {
            applyTextHighlight(childNode, searchPattern);
        }
    });

    return targetNode as HTMLElement;
}

export { applyTextHighlight, removeHighlight, HIGHLIGHT_STYLE };
