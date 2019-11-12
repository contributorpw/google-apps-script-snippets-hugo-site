/**
 * @file A snippet for .
 * Examples of the snippet {@link https://support.google.com/docs/thread/5809954?msgid=5809954}
 */

/**
 * Runs the snippet.
 * Removes rows by condition 'B:B=10'.
 * @ignore
 */
function run() {
  var sheet = SpreadsheetApp.getActiveSheet();
  deleteRowsByConditional_(sheet, function(row) {
    return row[1] === 10;
  });
}

/**
 * Runs the snippet.
 * Removes rows by condition 'B:B=10'. Appends deleted rows to the 'Archive' sheet.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Reset sheet')
    .addItem(
      'Reset active sheet (ContactPrice example)',
      'userActionResetActiveSheetByRangesAddresses'
    )
    .addItem('Reset ranges', 'userActionResetRangesByRangesAddresses')
    .addItem(
      'Reset multiple sheets',
      'userActionResetMultipleSheetsByRangesAddresses'
    )
    .addToUi();
}

/**
 * Clear specifing cells on the active sheet
 */
function userActionResetActiveSheetByRangesAddresses() {
  var sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getName() !== 'ContactPrice') return;
  var rangesAddressesList = ['B5', 'B7', 'B9', 'B11', 'B15', 'B19'];
  resetByRangesList_(sheet, rangesAddressesList);
}

/**
 * Clear specifing ranges
 */
function userActionResetRangesByRangesAddresses() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Reset ranges example');
  sheet.activate();
  var rangesAddressesList = ['B5:B15', 'B19'];
  resetByRangesList_(sheet, rangesAddressesList);
}

/**
 * Clear specifing sheets
 */
function userActionResetMultipleSheetsByRangesAddresses() {
  var sheetNames = [
    { name: 'Sheet1', rangesAddressesList: ['B5:B15', 'B19'] },
    { name: 'Sheet2', rangesAddressesList: ['A1:Z20'] },
  ];
  sheetNames.forEach(function(sn) {
    var sheet = SpreadsheetApp.getActive().getSheetByName(sn.name);
    if (sheet) {
      resetByRangesList_(sheet, sn.rangesAddressesList);
    }
  });
}

/**
 * Clear specifing sheets by color
 */
function userActionResetMultipleSheetsByColor() {
  var fColor = '#fa7d00';
  var sheetNames = [
    // { name: 'Sheet1' },
    { name: 'Reset by color (click the image)' },
  ];
  sheetNames.forEach(function(sn) {
    var sheet = SpreadsheetApp.getActive().getSheetByName(sn.name);
    if (sheet) {
      var rangesAddressesList = sheet
        .getDataRange()
        .getFontColors()
        .reduce(function(p, row, i) {
          var colors = row.reduce(function(p2, color, j) {
            if (color === fColor)
              p2.push(Utilities.formatString('R%sC%s', i + 1, j + 1));
            return p2;
          }, []);
          if (colors.length) p = p.concat(colors);
          return p;
        }, []);
      if (rangesAddressesList.length)
        resetByRangesList_(sheet, rangesAddressesList);
    }
  });
}

/**
 * Clear the sheet by the range list
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet The sheet
 * @param {Array.<string>} rangesAddressesList The list of ranges to return, as specified in A1 notation or R1C1 notation.
 */
function resetByRangesList_(sheet, rangesAddressesList) {
  sheet.getRangeList(rangesAddressesList).clearContent();
}
