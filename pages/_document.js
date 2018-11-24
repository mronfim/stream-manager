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
                    <link rel="stylesheet" href="https://use.typekit.net/fhl5htj.css"></link>
                    {/* <script dangerouslySetInnerHTML={{ __html: stylesheet }}></script> */}
                    {/* <script src="https://cdn.rawgit.com/coderitual/odoo/feature/codevember16/lib/odoo.js"></script> */}
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/lettering.js/0.7.0/jquery.lettering.min.js"></script>
                    {/* <script src="/static/labels.js"></script> */}
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