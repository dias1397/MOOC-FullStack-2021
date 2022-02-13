const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes
	}
	return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	const reducer = (prev, curr) => {
		return prev.likes > curr.likes ? 
			{
				title: prev.title,
				author: prev.author,
				likes: prev.likes
			} : {
				title: curr.title,
				author: curr.author,
				likes: curr.likes
			} 
	}
	return blogs.reduce(reducer, {})
}

const mostBlogs = (blogs) => {
	const authorsInArray = blogs.map(b => b.author)
	let numberOfBlogs = authorsInArray.map((author) => {
		const numberOf = authorsInArray.filter((b) => author === b).length
		let response = {
			author: author,
			blogs: numberOf
		}
		return response
	})
	numberOfBlogs.sort((a, b) => b.blogs - a.blogs)
	return (numberOfBlogs[0])
}

const mostLikes = (blogs) => {
	const authorsInArray = blogs.map(b => b.author)

	const uniqueAuthors = authorsInArray.filter((item, ind, arr) => arr.indexOf(item) === ind)

	const numberOfLikes = uniqueAuthors.map(author => {
		const authorBlogs = blogs.filter(item => author === item.author)
		const allLikes = authorBlogs.reduce((sum, item) => {
			return sum + item.likes
		}, 0)
		const response = {
			author: author,
			likes: allLikes
		}
		return response
	})
	numberOfLikes.sort((a, b) => b.likes - a.likes)
	return(numberOfLikes[0])
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
