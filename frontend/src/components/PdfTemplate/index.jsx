import { PDFViewer } from '@react-pdf/renderer';
import NextbridgeTemplate from '../pdf/NextbridgeTemplate';

const PdfTemplate = () => {
    return (
        <>
            <div>PdfTemplate</div>
            <div style={{ margin: 'auto', width: 1500 }} >
                <PDFViewer width={1600} height={750}>
                    {<NextbridgeTemplate projId='6461ff11c15325a53c09d3a4' projName='Para School' />}
                </PDFViewer>
            </div>


        </>
    )


}

export default PdfTemplate