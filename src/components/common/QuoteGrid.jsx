import { fetchQuote, fetchQuoteById } from "../../clients/freeApiQuoteClient.js"
import {useQuery} from "@tanstack/react-query";
import QuoteCard from "./QuoteCard.jsx";
import {useState} from "react";

const QuoteGrid = () => {

    const [ id, setId ] = useState(-1);

    const { isLoading: isFetchQuoteLoading, data: fetchedQuotes } = useQuery({
        queryKey: ["quotes"],
        queryFn: () => fetchQuote()
    });

    const { isLoading: isQuoteByIdLoading, data: fetchedQuoteByIdData } = useQuery({
        queryKey: ["quote", id],
        queryFn: () => fetchQuoteById(id),
        enabled: !!id,
    })

    const handleSubmit = event => {
        event.preventDefault();
    }

    const handleChange = event => {
        setId(() => event.target.value);
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="number"
                        placeholder="Enter Quote ID.."
                        value={id}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Submit
                    </button>
                </form>

                {isQuoteByIdLoading && <p>Loading...</p>}
                {fetchedQuoteByIdData && <div>{fetchedQuoteByIdData?.data?.content}</div>}
            </div>

            <h1>
                All Quotes.
            </h1>

            <div>
                { fetchedQuotes?.data?.data.map((quote) => (
                    <QuoteCard quote={quote}></QuoteCard>
                )) }
            </div>
        </>
    )
};

export default QuoteGrid;