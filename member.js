function skillsMember() {
    var member = document.getElementById("member");
    var memberSkills = document.getElementById("member-skills");
    var memberSkillsButton = document.getElementById("member-skills-button");
    var memberSkillsClose = document.getElementById("member-skills-close");

    memberSkillsButton.onclick = function() {
        memberSkills.style.display = "block";
        member.style.display = "none";
    };

    memberSkillsClose.onclick = function() {
        memberSkills.style.display = "none";
        member.style.display = "block";
    };
}