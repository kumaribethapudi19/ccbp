Login Route

When the invalid username and password are provided and the Login button is clicked, then the respective error message received from the response should be displayed When the valid username and password are provided and the Login button is clicked, then the page should be navigated to the Home Route When an unauthenticated user tries to access the Home, Bookshelves and Book Details Route, then the page should be navigated to the Login Route When an authenticated user tries to access the Home, Bookshelves and Book Details Route, then the page should be navigated to the respective route When an authenticated user tries to access the Login Route, then the page should be navigated to the Home Route

Home Route

When an authenticated user opens the Home Route,

An HTTP GET request should be made to Top Rated Books API URL with jwt_token in the Cookies

Loader should be displayed while fetching the data After the data is fetched successfully, display the list of top rated books received from the response If the HTTP GET request made is unsuccessful, then the failure view given in the Figma screens should be displayed

When the Try Again button is clicked, an HTTP GET request should be made to Top Rated Books API URL When the Find Books button is clicked, then the page should be navigated to the Bookshelves Route When a book item is clicked, then the page should be navigated to the Book Details Route Header

When the Book Hub logo in the header is clicked, then the page should be navigated to the Home Route When the Home link in the header is clicked, then the page should be navigated to the Home Route When the Bookshelves link in the header is clicked, then the page should be navigated to the Bookshelves Route When the Logout button in the header is clicked, then the page should be navigated to the Login Route

Bookshelves Route

When an authenticated user opens the Bookshelves Route

An HTTP GET request should be made to Books API URL with jwt_token in the Cookies and query parameters shelf and search with initial values as ALL and empty string respectively

The page should initially consist of All Books heading Loader should be displayed while fetching the data After the data is fetched successfully, display the list of books received from the response If the HTTP GET request made is unsuccessful, then the failure view given in the Figma screens should be displayed

When the Try Again button is clicked, an HTTP GET request should be made to Books API URL When a button in the bookshelves is clicked (Use the bookshelvesList data provided in the App.js to render Bookshelves),

The All Books heading changed to {bookshelf name} Books. Here the bookshelf name refers to the clicked bookshelf label from the provided bookshelvesList Make an HTTP GET request to the Books API URL with jwt_token in the Cookies and query parameter shelf with value as the value of the clicked bookshelf from the provided bookshelvesList Loader should be displayed while fetching the data After the data is fetched successfully, display the list of books received from the response When a non-empty value is provided in the search input and the search icon button is clicked

Make an HTTP GET request to the Books API URL with jwt_token in the Cookies and query parameter search with value as the text provided in the search input Loader should be displayed while fetching the data After the data is fetched successfully, display the list of books received from the response When the HTTP GET request made to the Books API URL returns an empty list for books, then the No Books View should be displayed as shown in the Figma

When multiple filters are applied, then the HTTP GET request should be made with all the filters that are applied

Book Details Route

When an authenticated user opens the Book Details Route

An HTTP GET request should be made to Book Details API URL with jwt_token in the Cookies and book id as path parameter Loader should be displayed while fetching the data After the data is fetched successfully, book details received from the response should be displayed If the HTTP GET request made is unsuccessful, then the failure view given in the Figma screens should be displayed When the Try Again button is clicked, an HTTP GET request should be made to Book Details API URL All the header functionalities mentioned in the Home Route should work in this route accordingly

Not Found Route

When a random path is provided as the URL path, then the page should be navigated to the Not Found Route Users should be able to view the website responsively in mobile view, tablet view as well

Third party packages to be used to achieve the design or functionality

React Slick

Routes

Render Login Route component when the path in URL matches /login Render Home Route component when the path in URL matches / Render Bookshelves Route component when the path in URL matches /shelf Render Book Details Route component when the path in URL matches /books/:id

The Failure View image should consist of alt attribute value as failure view

Login Route

Login Route should consist of website logo image with alt as login website logo Login Route should consist of a website login image with alt as website login The Cookies should be set by using the key name jwt_token Bookshelves Route

The book images in the Bookshelves Route should have the alt as the value of the key title respectively from the received Books response The search icon should be wrapped with an HTML button element with testid as searchButton BsSearch icon from react-icons should be used for the Search Icon button BsFillStarFill icon from react-icons should be used for the star image When the HTTP GET request made to the given Books API returns the books list as empty, then the page should consist of No Books image with alt as no books BookDetails Route

BsFillStarFill icon from react-icons should be used for the star image Not Found Route

The Not Found image should consist of alt attribute value as not found Header

The Book Hub Logo image in Header should consist of alt attribute value as website logo Footer

FaGoogle icon from react-icons should be used for the Google Icon button in Footer FaTwitter icon from react-icons should be used for the Twitter Icon button in Footer FaInstagram icon from react-icons should be used for the Instagram Icon button in Footer FaYoutube icon from react-icons should be used for the Youtube Icon button in Footer

Data fetch URLs Note: Use the below sample code snippet to make a POST request on Login using valid username and password.

JAVASCRIPT Login API

URL: https://apis.ccbp.in/login Method: POST Description: Returns a response based on the credentials provided

Sample request object: JSON Sample Success Response

JSON Sample Failure Response JSON Top Rated Books API

URL: https://apis.ccbp.in/book-hub/top-rated-books Method: GET Description: Returns a response containing the list of 10 top rated books

Sample Response

JSON Books API

URL: https://apis.ccbp.in/book-hub/books?shelf={bookshelfName}&search={searchText} Example: https://apis.ccbp.in/book-hub/books?shelf=Read&search=Luke Method: GET Description: Returns a response containing the list of books based on the query parameters

Sample Response

JSON Book Details API

URL: https://apis.ccbp.in/book-hub/books/{bookId} Example: https://apis.ccbp.in/book-hub/books/7850622e-1b70-4396-963d-e68d5a2577d7 Method: GET Description: Returns a response containing book details

Sample Response

You can use any one of the following credentials username: aakash password: sky@007

username: agastya password: myth#789

username: advika password: world@5

username: rahul password: rahul@2021
