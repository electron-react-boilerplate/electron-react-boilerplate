import { Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import React from 'react';
import XLSX from 'xlsx';

interface XlsxObject {
  [key: string]: string | number;
}

// const formatOptions = ['Fødselsdato (ddmmyyyy)', 'ddmmyy'];

const Fileupload = () => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const file = e?.target?.files[0];

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const json = Array.from(XLSX.utils.sheet_to_json(workbook.Sheets.Ark1));

    json.forEach((row: Pick<XlsxObject, 'ddmmyy'>) => {
      console.log(row?.ddmmyy);
    });
  };
  return (
    <Button
      sx={{ width: '100%', height: '50px' }}
      variant="contained"
      component="label"
      startIcon={<UploadFileIcon />}
    >
      Last opp regneark
      <input
        hidden
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        multiple
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          handleUpload(e);
        }}
      />
    </Button>
  );
};

export default Fileupload;
