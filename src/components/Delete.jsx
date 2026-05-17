"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Delete = ({ destination }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { _id, destinationName, description } = destination;

  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${_id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.deletedCount > 0) {
        alert("Destination Deleted Successfully!");

        // modal close
        setIsOpen(false);

        // redirect to destinations page
        router.push("/destinations");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Delete Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            
            {/* Title */}
            <h2 className="text-xl font-semibold text-red-600 mb-3">
              Delete {destinationName}?
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-6">
              This destination will be permanently deleted. This action cannot
              be undone.
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="w-full py-2 bg-red-600 text-white rounded-lg"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Delete;