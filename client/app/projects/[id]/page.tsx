"use client";

import { useState } from "react";
import ProjectHeader from "../ProjectHeader";
// import ProjectHeader from "../ProjectHeader";

type Props = {
  params: { id: string };
};

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      {/* MODAL NEW TASK */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      hello {id}
    </div>
  );
};

export default Project;
