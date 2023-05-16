import { Document, Page, View, PDFViewer, BlobProvider } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import PdfTemplate from '../PdfTemplate';

const generatePDF = () => (
    <Document>
        <Page size="A4">
            <View>
                <PdfTemplate />
            </View>
        </Page>
    </Document>
);

const PDFGenerator = () => {
    const handleGeneratePDF = () => {
        const MyPDF = generatePDF();

        // Define the component to render the PDF
        const PDFDocument = () => (
            <BlobProvider document={MyPDF}>
                {({ blob, url, loading, error }) => {
                    if (loading) {
                        return <div>Loading PDF...</div>;
                    }
                    if (error) {
                        return <div>Error generating PDF.</div>;
                    }
                    // Trigger the download
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'my_custom_component.pdf';
                    link.click();
                }}
            </BlobProvider>
        );

        // Render the PDF document
        ReactDOM.render(<PDFDocument />, document.getElementById('pdf-container'));
    };

    return (
        <div>
            <h1>Generate PDF</h1>
            <button onClick={handleGeneratePDF}>Download PDF</button>
            <div id="pdf-container"></div>
        </div>
    );
};
export default PDFGenerator