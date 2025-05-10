import React from 'react';

const DocsPage: React.FC = () => (
  <div className="prose max-w-none p-6">
    {/* Taking inputs (stdin) */}
    <h2>Taking inputs (stdin)</h2>
    <p>
      OneCompiler's python online editor supports stdin and users can give inputs to programs using the STDIN textbox under the I/O tab.
      Following is a sample python program which takes name as input and print your name with hello.
    </p>
    <pre className="bg-gray-100 p-4 rounded">
{`import sys
name = sys.stdin.readline()
print("Hello " + name)`}
    </pre>

    {/* About Python */}
    <h2>About Python</h2>
    <p>
      Python is a very popular general-purpose programming language which was created by Guido van Rossum, and released in 1991.
      It is very popular for web development and you can build almost anything like mobile apps, web apps, tools, data analytics,
      machine learning etc. It is designed to be simple and easy like english language. It's is highly productive and efficient making
      it a very popular language.
    </p>

    {/* Tutorial & Syntax help */}
    <h2>Tutorial &amp; Syntax help</h2>

    <h3>Loops</h3>

    {/* If-Else */}
    <h4>1. If-Else:</h4>
    <p>
      Whenever you want to perform a set of operations based on a condition IF-ELSE is used.
    </p>
    <pre className="bg-gray-100 p-4 rounded">
{`if conditional-expression:
    # code
elif conditional-expression:
    # code
else:
    # code`}
    </pre>
    <p><strong>Note:</strong> Indentation is very important in Python, make sure the indentation is followed correctly.</p>

    {/* For */}
    <h4>2. For:</h4>
    <p>For loop is used to iterate over arrays (list, tuple, set, dictionary) or strings.</p>
    <p><strong>Example:</strong></p>
    <pre className="bg-gray-100 p-4 rounded">
{`mylist = ["Iphone","Pixel","Samsung"]
for i in mylist:
    print(i)`}
    </pre>

    {/* While */}
    <h4>3. While:</h4>
    <p>
      While is also used to iterate a set of statements based on a condition. Usually while is preferred when number
      of iterations are not known in advance.
    </p>
    <pre className="bg-gray-100 p-4 rounded">
{`while condition:
    # code`}
    </pre>

    {/* Collections */}
    <h3>Collections</h3>
    <p>There are four types of collections in Python.</p>

    {/* List */}
    <h4>1. List:</h4>
    <p>
      List is a collection which is ordered and can be changed. Lists are specified in square brackets.
    </p>
    <p><strong>Example:</strong></p>
    <pre className="bg-gray-100 p-4 rounded">
{`mylist = ["iPhone","Pixel","Samsung"]
print(mylist)`}
    </pre>

    {/* Tuple */}
    <h4>2. Tuple:</h4>
    <p>
      Tuple is a collection which is ordered and can not be changed. Tuples are specified in round brackets.
    </p>
    <p><strong>Example:</strong></p>
    <pre className="bg-gray-100 p-4 rounded">
{`myTuple = ("iPhone","Pixel","Samsung")
print(myTuple)`}

    {/* Demonstrate immutability */}
    {"\n"}Below throws an error if you assign another value to tuple again.
{`

myTuple = ("iPhone","Pixel","Samsung")
print(myTuple)
myTuple[1] = "onePlus"
print(myTuple)`}
    </pre>

    {/* Set */}
    <h4>3. Set:</h4>
    <p>
      Set is a collection which is unordered and unindexed. Sets are specified in curly brackets.
    </p>
    <p><strong>Example:</strong></p>
    <pre className="bg-gray-100 p-4 rounded">
{`myset = {"iPhone","Pixel","Samsung"}
print(myset)`}
    </pre>

    {/* Dictionary */}
    <h4>4. Dictionary:</h4>
    <p>
      Dictionary is a collection of key value pairs which is unordered, can be changed, and indexed. They are written
      in curly brackets with key-value pairs.
    </p>
    <p><strong>Example:</strong></p>
    <pre className="bg-gray-100 p-4 rounded">
{`mydict = {
    "brand": "iPhone",
    "model": "iPhone 11"
}
print(mydict)`}
    </pre>

    {/* Supported Libraries */}
    <h3>Supported Libraries</h3>
    <p>Following are the libraries supported by OneCompiler's Python compiler:</p>
    <table className="table-auto border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-1">Name</th>
          <th className="border border-gray-300 px-2 py-1">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-300 px-2 py-1">NumPy</td>
          <td className="border border-gray-300 px-2 py-1">NumPy python library helps users to work on arrays with ease</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1">SciPy</td>
          <td className="border border-gray-300 px-2 py-1">SciPy is a scientific computation library which depends on NumPy for fast N-dimensional array manipulation</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1">SKLearn/Scikit-learn</td>
          <td className="border border-gray-300 px-2 py-1">Scikit-learn is the most useful library for machine learning in Python</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1">Pandas</td>
          <td className="border border-gray-300 px-2 py-1">Pandas is the most efficient Python library for data manipulation and analysis</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-2 py-1">DOcplex</td>
          <td className="border border-gray-300 px-2 py-1">DOcplex (IBM Decision Optimization CPLEX Modeling for Python) for mathematical programming and constraint programming</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default DocsPage;
