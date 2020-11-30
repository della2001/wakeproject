gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1wzQ3v2wj_EwW6_xJvRLVaaHCeMNUSIgc9d1f1c6rpoU',
    range: 'Sheet1'
  }).then((response) => {
    var result = response.result;
    var numRows = result.values ? result.values.length : 0;
    console.log(`${numRows} rows retrieved.`);
  });
  document.getElementById('test').innerHTML = result;