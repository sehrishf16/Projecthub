import { Box, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import initialMembers from "../../data/members";

import TeamToolbar from "../../components/team/TeamToolbar";
import TeamTable from "../../components/team/TeamTable";
import MemberDialog from "../../components/team/MemberDialog";
import DeleteMemberDialog from "../../components/team/DeleteMemberDialog";

const Team = () => {
  const [members, setMembers] = useState(() => {
    try {
      const saved = localStorage.getItem("members");

      return saved
        ? JSON.parse(saved)
        : initialMembers;
    } catch (error) {
      console.error(
        "Unable to load team members",
        error
      );

      return initialMembers;
    }
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [editingMember, setEditingMember] =
    useState(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedMember, setSelectedMember] =
    useState(null);

  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  

  useEffect(() => {
    localStorage.setItem(
      "members",
      JSON.stringify(members)
    );

    /*
     * Tell Dashboard that team data changed.
     */
    window.dispatchEvent(
      new Event("projecthub:data-updated")
    );
  }, [members]);

  

  const addMember = (member) => {
    const newMember = {
      ...member,
      id: Date.now(),
    };

    setMembers((prev) => [
      ...prev,
      newMember,
    ]);

    setPage(1);
  };

  
  const updateMember = (updatedMember) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === updatedMember.id
          ? updatedMember
          : member
      )
    );
  };

  

  const editMember = (member) => {
    setEditingMember(member);
    setDialogOpen(true);
  };

 

  const deleteMember = (member) => {
    setSelectedMember(member);
    setDeleteOpen(true);
  };

  

  const confirmDelete = () => {
    if (!selectedMember) {
      return;
    }

    setMembers((prev) =>
      prev.filter(
        (member) =>
          member.id !== selectedMember.id
      )
    );

    setDeleteOpen(false);
    setSelectedMember(null);
    setPage(1);
  };

  

  const filteredMembers = members.filter(
    (member) => {
      const memberName =
        member.name || "";

      const memberEmail =
        member.email || "";

      const matchesSearch =
        memberName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        memberEmail
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        status === "All" ||
        member.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  

  const paginatedMembers =
    filteredMembers.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );

  return (
    <Box>
     

      <Typography
        variant="h4"
        fontWeight={700}
      >
        Team Members
      </Typography>

      

      <TeamToolbar
        onAdd={() => {
          setEditingMember(null);
          setDialogOpen(true);
        }}
        search={search}
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        status={status}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
      />

    

      <TeamTable
        members={paginatedMembers}
        onEdit={editMember}
        onDelete={deleteMember}
      />

     
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Pagination
          page={page}
          count={Math.max(
            1,
            Math.ceil(
              filteredMembers.length /
                rowsPerPage
            )
          )}
          onChange={(event, value) =>
            setPage(value)
          }
          color="primary"
          shape="rounded"
        />
      </Box>

     

      <MemberDialog
        open={dialogOpen}
        handleClose={() => {
          setDialogOpen(false);
          setEditingMember(null);
        }}
        addMember={addMember}
        updateMember={updateMember}
        editingMember={editingMember}
      />



      <DeleteMemberDialog
        open={deleteOpen}
        handleClose={() => {
          setDeleteOpen(false);
          setSelectedMember(null);
        }}
        handleDelete={confirmDelete}
        memberName={
          selectedMember?.name
        }
      />
    </Box>
  );
};

export default Team;