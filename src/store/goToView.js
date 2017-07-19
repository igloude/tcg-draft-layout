/**
 * Transition to the pack view. Called when a new pack is available for picking, and when the host starts a draft.
 */
function goToView(viewName, draftId, playerId) {
    this.$router.push({
        name: viewName,
        params: {
            draft_id: draftId,
            player_id: playerId
        }
    })
}

export default goToView;
