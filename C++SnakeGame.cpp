#include <iostream>
#include <conio.h>
#include <Windows.h>
using namespace std;

/* Define global variables to be used in functions */

// Flag to track whether the game is over or not
bool gameOver;

// Height and width of the grid
const int width = 20;
const int height = 20;

// Snake head position (x, y), fruit position (fruitX, fruitY), current score (score)
// Length of the snake (len), and sleep time (slp) between frames
int x, y, fruitX, fruitY, score, len, slp;

// Arrays to store the tail positions of the snake
int tailX[100], tailY[100];

// Initialize length of the tail
int nTail = 0;

// Enumeration for the direction of the snake
enum eDirection { STOP = 0, LEFT, RIGHT, UP, DOWN };
eDirection dir;

/* The Setup function */
void Setup()
{
	// Initialize game over flag to false
	gameOver = false;

	// Set initial direction of the snake to STOP (not moving)
	dir = STOP;

	// Set initial position of the snake's head to the center of the grid
	x = width / 2;
	y = height / 2;

	// Set initial position of the fruit randomly within the grid
	fruitX = rand() % width;
	fruitY = rand() % height;

	// Initialize the score to zero
	score = 0;

	// Set initial length of the tail to zero
	nTail = 0;

	// Set the initial sleep time between frames (controls the speed of the game)
	slp = 120;
}

/* The Draw function */
void Draw()
{
	// Clear the console screen
	system("cls");

	// Draw the upper boundary of the grid
	for (int i = 0; i < width + 2; i++)
		cout << "#";
	cout << endl;

	// Draw the grid and snake body
	for (int i = 0; i < height; i++)
	{
		for (int j = 0; j < width; j++)
		{
			// Draw left boundary of the grid
			if (j == 0)
				cout << "#";

			// Draw the snake's head
			if (i == y && j == x)
				cout << "0";
			// Draw the fruit
			else if (i == fruitY && j == fruitX)
				cout << "F";
			// Draw the snake's tail
			else
			{
				bool print = false;
				for (int k = 0; k < nTail; k++)
				{
					if (tailX[k] == j && tailY[k] == i)
					{
						cout << "o";
						print = true;
					}
				}
				// If no tail segment is present, draw an empty space
				if (!print)
					cout << " ";
			}

			// Draw right boundary of the grid
			if (j == width - 1)
				cout << "#";
		}
		cout << endl;
	}

	// Draw the lower boundary of the grid
	for (int i = 0; i < width + 2; i++)
		cout << "#";
	cout << endl;

	// Display the current score
	cout << "Score:" << score << endl;
}

/* This function handles input for the direction of the snake and an option for the user to end the game using a switch case statement */
void Input()
{
	if (_kbhit())
	{
		switch (_getch())
		{
			// Move left (turn left)
		case 'a':
			dir = LEFT;
			break;
			// Move right (turn right)
		case 'd':
			dir = RIGHT;
			break;
			// Move up (turn up)
		case 'w':
			dir = UP;
			break;
			// Move down (turn down)
		case 's':
			dir = DOWN;
			break;
			// Exit the game
		case 'x':
			gameOver = true;
			break;
		}
	}
}

/* The Logic function */
void Logic()
{
	// Variables to store the previous position of the tail
	int prevX = tailX[0];
	int prevY = tailY[0];
	int prev2X, prev2Y;

	// Update the position of the first tail segment to the current head position
	tailX[0] = x;
	tailY[0] = y;

	// Move the rest of the tail segments to their previous position
	for (int i = 1; i < nTail; i++)
	{
		prev2X = tailX[i];
		prev2Y = tailY[i];
		tailX[i] = prevX;
		tailY[i] = prevY;
		prevX = prev2X;
		prevY = prev2Y;
	}

	// Move the snake's head in the specified direction
	switch (dir)
	{
	case LEFT:
		x--;
		break;
	case RIGHT:
		x++;
		break;
	case UP:
		y--;
		break;
	case DOWN:
		y++;
		break;
	default:
		break;
	}

	// Check for collisions with the boundaries of the grid
	if (x > width - 1 || x < 0 || y > height - 1 || y < 0)
		gameOver = true;

	// Check for collisions with the snake's own tail
	for (int i = 0; i < nTail; i++)
		if (tailX[i] == x && tailY[i] == y)
			gameOver = true;

	// Check if the snake has eaten the fruit
	if (x == fruitX && y == fruitY)
	{
		// Increase the score and length of the tail
		score += 10;
		nTail += 1;

		// Increase the speed of the game by reducing the sleep time between frames
		slp -= 10;

		// Generate a new random position for the fruit
		fruitX = rand() % width;
		fruitY = rand() % height;
	}
}

/* Main function */
int main()
{
	// Call the Setup function to initialize the game
	Setup();

	// Main game loop
	while (!gameOver)
	{
		// Draw the current state of the game
		Draw();

		// Handle user input for direction and game termination
		Input();

		// Update the logic of the game (movement, collision detection, etc.)
		Logic();

		// Pause the game for a short duration determined by the sleep time (controls game speed)
		Sleep(slp);
	}

	return 0;
}
