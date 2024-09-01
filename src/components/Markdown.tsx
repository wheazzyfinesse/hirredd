import ReactMarkdown from "react-markdown";
interface MarkdownProps {
    children: string;
}
const Markdown = ({ children }: MarkdownProps) => {
    return (
        <ReactMarkdown
            className="space-y-3"
            components={{
                ul: (props) => (
                    <ul className="list-inside list-disc" {...props}></ul>
                ),
                a: (props) => (
                    <a
                        className="text-green-500 hover:text-green-900 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                    />
                ),
            }}
        >
            {children}
        </ReactMarkdown>
    );
};

export default Markdown;
