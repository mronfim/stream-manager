import Document, { Head, Main, NextScript } from 'next/document'

class Overlay extends Document {

    static getInitialProps({ renderPage }) {
        const { html, head, errorHtml, chunks } = renderPage()
        return { html, head, errorHtml, chunks }
    }

    render() {
        return (
            <html>
                <Head>
                    {/* <script dangerouslySetInnerHTML={{ __html: stylesheet }}></script> */}
                    <script src="https://cdn.rawgit.com/coderitual/odoo/feature/codevember16/lib/odoo.js"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}

export default Overlay