import { FaStar, FaUser } from 'react-icons/fa';

const Review = ({ review }) => {
    // Function to generate star icons based on the rating value
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < review.rating; i++) {
            stars.push(<FaStar key={i} className="text-yellow-500" />);
        }
        return stars;
    };

    return (
        <div className='border-b-2 my-2'>
            <div className='flex items-center'>
                <FaUser className='text-4xl'/>
                <div>
                <h5>{review.user.name}</h5>
                <p className='flex'>{renderStars()}</p>
                </div>
            </div>
            <div>
                <p>{review.review}</p>
            </div>
        </div>
    );
};

export default Review;
