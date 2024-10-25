const DaysGeneralStats = ({ date, dailyNorm, fulfillment, servings }) => {
    return (
        <div>
            <div>
                <p>{date}</p>
                <p>Daily norma: {dailyNorm} L</p>
                <p>Fulfillment of the daily norm: {fulfillment}% </p>
                <p>How many servings of water: {servings}</p>
            </div>
        </div>
    );
};
export default DaysGeneralStats;