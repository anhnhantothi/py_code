// src/components/DocsPage.tsx
import React from 'react';
import { motion } from 'framer-motion';

const DocsPage: React.FC = () => (
  <div className="prose dark:prose-dark max-w-none px-6 py-12 lg:px-20 lg:py-20">
    {/* Section wrapper with fade-in */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="border-l-4 border-indigo-500 pl-4">Taking inputs (stdin)</h2>
      <p>
        OneCompiler's python online editor supports stdin and users can give inputs to programs using the STDIN textbox under the I/O tab.
        Following is a sample python program which takes name as input and print your name with hello.
      </p>
      <pre className="relative bg-gray-900 text-gray-100 p-6 rounded-xl overflow-auto before:absolute before:top-2 before:left-2 before:h-3 before:w-3 before:rounded-full before:bg-red-500 before:shadow-md before:mr-1">
{`import sys
name = sys.stdin.readline()
print("Hello " + name)`}
      </pre>
    </motion.div>

    <motion.div
      className="mt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="border-l-4 border-indigo-500 pl-4">About Python</h2>
      <p>
        Python is a very popular general-purpose programming language which was created by Guido van Rossum, and released in 1991.
        It is very popular for web development and you can build almost anything like mobile apps, web apps, tools, data analytics,
        machine learning etc. It is designed to be simple and easy like english language. It's is highly productive and efficient making
        it a very popular language.
      </p>
    </motion.div>

    <motion.div
      className="mt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="border-l-4 border-indigo-500 pl-4">Tutorial &amp; Syntax help</h2>

      <h3 className="mt-8">Loops</h3>

      <h4 className="mt-6">1. If-Else:</h4>
      <p>
        Whenever you want to perform a set of operations based on a condition IF-ELSE is used.
      </p>
      <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-auto">
{`if conditional-expression:
    # code
elif conditional-expression:
    # code
else:
    # code`}
      </pre>
      <p><strong>Note:</strong> Indentation is very important in Python, make sure the indentation is followed correctly.</p>

      <h4 className="mt-6">2. For:</h4>
      <p>For loop is used to iterate over arrays (list, tuple, set, dictionary) or strings.</p>
      <p><strong>Example:</strong></p>
      <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-auto">
{`mylist = ["Iphone","Pixel","Samsung"]
for i in mylist:
    print(i)`}
      </pre>

      <h4 className="mt-6">3. While:</h4>
      <p>
        While is also used to iterate a set of statements based on a condition. Usually while is preferred when number
        of iterations are not known in advance.
      </p>
      <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-auto">
{`while condition:
    # code`}
      </pre>
    </motion.div>

    <motion.div
      className="mt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
    >
      <h3 className="border-l-4 border-indigo-500 pl-4">Collections</h3>
      <p>There are four types of collections in Python.</p>

      <h4 className="mt-6">1. List:</h4>
      <p>List is a collection which is ordered and can be changed. Lists are specified in square brackets.</p>
      <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-auto">
{`mylist = ["iPhone","Pixel","Samsung"]
print(mylist)`}
      </pre>

      <h4 className="mt-6">2. Tuple:</h4>
      <p>Tuple is a collection which is ordered and can not be changed. Tuples are specified in round brackets.</p>
      <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-auto">
{`myTuple = ("iPhone","Pixel","Samsung")
print(myTuple)

# Below throws an error if you assign:
myTuple[1] = "onePlus"`}
      </pre>

      <h4 className="mt-6">3. Set:</h4>
      <p>Set is a collection which is unordered and unindexed. Sets are specified in curly brackets.</p>
      <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-auto">
{`myset = {"iPhone","Pixel","Samsung"}
print(myset)`}
      </pre>

      <h4 className="mt-6">4. Dictionary:</h4>
      <p>Dictionary is a collection of key value pairs which is unordered, can be changed, and indexed.</p>
      <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-auto">
{`mydict = {
    "brand": "iPhone",
    "model": "iPhone 11"
}
print(mydict)`}
      </pre>
    </motion.div>

    <motion.div
      className="mt-16 overflow-x-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8 }}
    >
      <h3 className="border-l-4 border-indigo-500 pl-4">Supported Libraries</h3>
      <table className="min-w-full mt-4 divide-y divide-gray-200">
        <thead className="bg-indigo-50">
          <tr>
            <th className="px-4 py-2 text-left text-indigo-700">Name</th>
            <th className="px-4 py-2 text-left text-indigo-700">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2">NumPy</td>
            <td className="px-4 py-2">NumPy python library helps users to work on arrays with ease</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2">SciPy</td>
            <td className="px-4 py-2">SciPy is a scientific computation library which depends on NumPy for fast N-dimensional array manipulation</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2">SKLearn/Scikit-learn</td>
            <td className="px-4 py-2">Scikit-learn is the most useful library for machine learning in Python</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2">Pandas</td>
            <td className="px-4 py-2">Pandas is the most efficient Python library for data manipulation and analysis</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2">DOcplex</td>
            <td className="px-4 py-2">DOcplex (IBM Decision Optimization CPLEX Modeling for Python) for mathematical programming and constraint programming</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  </div>
);

export default DocsPage;
