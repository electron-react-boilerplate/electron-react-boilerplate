import React from 'react';
import PropTypes from 'prop-types';

/** An override of:
 * https://github.com/bvaughn/react-virtualized/blob/8738097a6ead422f74590d6a631bd5fd83ebc831/source/CellMeasurer/CellMeasurer.js
 *
 * My version uses the pre-calulated item widths and heights to set the dimensions.
 * This is much more performant than waiting for the element to render
 * and then inspecting it's rendered styles.
 */
export default class PreCalculatedCellMeasurer extends React.PureComponent {
  static internalCellMeasurerFlag = false;

  componentDidMount() {
    this.maybeMeasureCell();
  }

  componentDidUpdate() {
    this.maybeMeasureCell();
  }

  getCellMeasurements() {
    const { columnWidth, width, height, gutter } = this.props;

    const widthAvailable = columnWidth - 2 * gutter;
    const calculatedWidth = Math.min(width, widthAvailable);
    const calculatedHeight = (height / width) * calculatedWidth;

    return { height: calculatedHeight, width: calculatedWidth };
  }

  maybeMeasureCell() {
    const { cache, columnIndex, parent, index: rowIndex } = this.props;

    if (!cache.has(rowIndex, columnIndex)) {
      const { height, width } = this.getCellMeasurements();

      cache.set(rowIndex, columnIndex, width, height);

      // If size has changed, let Grid know to re-render.
      if (parent && typeof parent.invalidateCellSizeAfterRender === 'function') {
        parent.invalidateCellSizeAfterRender({
          columnIndex,
          rowIndex,
        });
      }
    }
  }

  measure = () => {
    const { cache, columnIndex, parent, index: rowIndex } = this.props;

    const { height, width } = this.getCellMeasurements();

    if (height !== cache.getHeight(rowIndex, columnIndex) || width !== cache.getWidth(rowIndex, columnIndex)) {
      cache.set(rowIndex, columnIndex, width, height);

      if (parent && typeof parent.recomputeGridSize === 'function') {
        parent.recomputeGridSize({
          columnIndex,
          rowIndex,
        });
      }
    }
  };

  render() {
    const { children } = this.props;

    return typeof children === 'function' ? children({ measure: this.measure }) : children;
  }
}

// Used for DEV mode warning check
if (process.env.NODE_ENV !== 'production') {
  PreCalculatedCellMeasurer.internalCellMeasurerFlag = true;
}

PreCalculatedCellMeasurer.defaultProps = {
  columnIndex: 0,
  index: 0,
};

PreCalculatedCellMeasurer.propTypes = {
  cache: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.func]).isRequired,
  columnIndex: PropTypes.number,
  index: PropTypes.number,
  parent: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  columnWidth: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  gutter: PropTypes.number.isRequired,
};
