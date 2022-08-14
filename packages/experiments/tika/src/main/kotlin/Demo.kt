import org.apache.tika.Tika
import org.apache.tika.parser.AutoDetectParser
import org.apache.tika.sax.BodyContentHandler
import org.apache.tika.metadata.Metadata
import org.apache.tika.sax.ToXMLContentHandler
import java.io.File
import java.net.URL
import java.nio.file.Files
import java.nio.file.Paths

const val url = "https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:11972B/TXT&qid=1660480113506&from=EN"
fun main(vararg args: String) {
    val parser = AutoDetectParser()
    val handler = ToXMLContentHandler()
    val metadata = Metadata()

    val stream = URL(url).openStream()
    parser.parse(stream, handler, metadata)
    print(handler.toString())
    File("/home/gebruiker/lawbrador/packages/experiments/untitled/src/main/resources/demo.html").writeText(handler.toString())
}
